import { Elysia, t } from 'elysia';
import {prisma} from '~libs/prisma';
import { comparePassword, hashPassword } from '~utils/bcrypt';
import { isAuthenticated } from '~middlewares/auth'

export const auth = (app: Elysia) =>
    app.group('/auth', (app) =>
        app
            .post("/register", async ({ body, set }) => {
                const { email, name, password } = body;
                const emailExists = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                    select: {
                        id: true,
                    },

                });
                if (emailExists) {
                    set.status = 400;
                    return {
                        success: false,
                        data: null,
                        message: "Email address alredy in use.",

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

            },
                {
                    body: t.Object({
                        name: t.String(),
                        email: t.String(),
                        password: t.String(),
                    }),
                }
            )
            .post(
                "/login",
              

                async ({ body, set, jwt, setCookie }) => {
                    const { email, password } = body;

                    //verify password
                    const user = await prisma.user.findFirst({
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
                   

                   // generate access and refresh token

                   const accessToken = await jwt.sign({
                    userId: user.id,
                   });
                   const refreshToken = await jwt.sign({
                    userId: user.id,
                   });

                   setCookie("access_token", accessToken, {
                    maxAge: 15 * 60, 
                    path: "/",
                   });
                   setCookie("refresh token", refreshToken, {
                    maxAge: 86400 * 7,
                    path: "/",
                   });

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
            .use(isAuthenticated)

            .get("/me", ({user}) => {
                return {
                    success: true,
                    message: "Fetch authenticated user details",
                    data: {
                        user,
                    }
                }
            })
    )