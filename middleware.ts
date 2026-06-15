import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();

  // Redirect unauthenticated users
  if (!user && (url.pathname.startsWith('/admin') || url.pathname.startsWith('/instructor') || url.pathname.startsWith('/student'))) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const role = profile?.role;

    // RBAC: Redirect based on role attempting to access restricted path
    if (url.pathname.startsWith('/admin') && role !== 'admin') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    if (url.pathname.startsWith('/instructor') && role !== 'instructor' && role !== 'admin') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    if (url.pathname.startsWith('/student') && role !== 'student' && role !== 'instructor' && role !== 'admin') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
