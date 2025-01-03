import { Elysia, t } from 'elysia';
import { prisma } from '~libs/prisma';
import { comparePassword, hashPassword } from '~utils/bcrypt';
import { isAuthenticated } from '~middlewares/auth'

interface RegisterRequestBody {
    name: string;
    email: string;
    password: string;
}

interface LoginRequestBody {
    email: string;
    password: string;
}

interface SetCookieOptions {
    maxAge?: number;
    path?: string;
    httpOnly?: boolean;
}



export const auth = (app: Elysia) =>
    app.group('/auth', (app) =>
        app
            .post("/register",
                {
                    body: t.Object({
                        name: t.String(),
                        email: t.String(),
                        password: t.String()
                    })
                },

                async ({ body, set }: {body: RegisterRequestBody; set: any}) => {
                    const { name, email, password } = body;
                    const emailInUse = await prisma.user.findUnique({
                        where: {
                            email,
                        },
                        select: {
                            id: true,
                        },

                    });
                    if (emailInUse) {
                        set.status = 400;
                        return {
                            success: false,
                            message: "Email in use.",

                        };

                    }
                    const { hash, salt } = await hashPassword(password);
                    // const emailHash = md5hash(email);

                    const newUser = await prisma.user.create(
                        {
                            data: {
                                name,
                                email,
                                hash,
                                salt,
                            },
                        });
                    set.status = 201;
                    return {
                        success: true,
                        message: "Account created",
                        data: {
                            user: newUser,
                        },
                    };

                }
            )
            .post(
                "/login",


                async ({ body, set, jwt, setCookie }: { body: LoginRequestBody; set: any; jwt: any; setCookie: (name: string, value: string, options?: SetCookieOptions) => void }) => {
                    const { email, password } = body;

                    //verify password
                    const user = await prisma.user.findUnique({
                        where: {
                            email: email,
                        },
                        select: {
                            id: true,
                            hash: true,
                            salt: true,
                        },
                    });

                    if (!user) {
                        set.status = 400;
                        return {
                            success: false,
                            data: null,
                            message: "Invalid user",
                        };
                    }
                    //verify password
                    const match = await comparePassword(password, user.salt, user.hash);
                    console.log('Password:', password);
                    console.log('Stored Hash:', user.hash);
                    console.log('Stored Salt:', user.salt)
                    console.log("Match", match)
                    if (!match) {
                        set.status = 400;
                        return {
                            success: false,
                            data: null,
                            message: "Invalid password"
                        };
                    }
                    // Log to confirm setCookie is available
                    if (typeof setCookie === 'function') {
                        console.log('setCookie is available');
                    } else {
                        console.error('setCookie is not available');
                    }

                    // generate access and refresh token

                    
                    // const accessToken = await jwt.sign({
                    //     userId: user.id,
                    // });
                    // const refreshToken = await jwt.sign({
                    //     userId: user.id,
                    // });

                    // setCookie("access_token", accessToken, {
                    //     maxAge: 15 * 60,
                    //     path: "/",
                    // });
                    // setCookie("refresh token", refreshToken, {
                    //     maxAge: 86400 * 7,
                    //     path: "/",
                    // });

                    return {
                        success: true,
                        data: null,
                        message: "Account login successfully",
                    };
                },
                {
                    body: t.Object({
                        email: t.String(),
                        password: t.String(),
                    }),
                },
            )
            .post(
                "/logout",
                async ({ setCookie }) => {
                    setCookie("access_token", "", {
                        maxAge: -1,
                        path: "/",
                    });
                    setCookie("refresh_token", "", {
                        maxAge: -1,
                        path: "/",
                    })

                    return {
                        success: true,
                        message: "Logged out successfully",
                    }
                }
            )
            .use(isAuthenticated)

            .get("/me", ({ user }) => {
                return {
                    success: true,
                    message: "Fetch authenticated user details",
                    data: {
                        user,
                    }
                }
            })
    )