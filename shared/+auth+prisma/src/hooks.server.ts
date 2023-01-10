import type { Handle } from "@sveltejs/kit";

// Provider types are broken once more
// https://github.com/nextauthjs/next-auth/issues/2681
import type { Provider } from "@auth/core/providers";
import type { Profile } from "@auth/core/types";

// Imports for Auth
import { SvelteKitAuth } from "@auth/sveltekit";
import { PrismaAdapter } from "$lib/server/auth/PrismaAdapter";

import GoogleProvider from "@auth/core/providers/google";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";

// Imports for Auth - Prisma Adapter
import { prisma } from "$lib/server/db";

export const handle: Handle = SvelteKitAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      // Must pass style for Google and Facebook
      // https://github.com/nextauthjs/next-auth/issues/6341#event-8186501509
      style: {
        logo: "https://authjs.dev/img/providers/google.svg",
        logoDark: "https://authjs.dev/img/providers/google.svg",
        bgDark: "#fff",
        bg: "#fff",
        text: "#000",
        textDark: "#000",
      },
    }) as Provider<Profile>,
  ],
  adapter: PrismaAdapter(prisma),
  // Session token not generated correctly
  // https://github.com/nextauthjs/next-auth/issues/6076
  session: {
    strategy: "database",
    generateSessionToken: () => {
      return crypto.randomUUID();
    },
  },
});
