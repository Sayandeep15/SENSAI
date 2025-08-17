"use server"
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { success } from "zod";


export async function updateUser(data) {
    //CHECK IF THE USER LOGGED IN OR NOT
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    //CHECK USER DATA IS PRESENT IN DB OR NOT
    const user = await db.user.findUnique({
        where: { clerkUserId: userId }
    });
    if (!user) throw new Error("User not found");

    try {
        //START A TRANSACTION TO HANDLE SOME OPERATION
        const result = await db.$transaction(
            async (tx) => {

                // CHECK IF INSDUSTRY EXIST OR 
                let industryInsight = await tx.industryInsight.findUnique({
                    where: { industry: data.industry },
                });

                // IF NOT EXIST THEN CREATE DEFAULT INSDUSTRY
                if (!industryInsight) {
                    industryInsight = await tx.industryInsight.create({
                        data: {
                            industry: data.industry,
                            salaryRanges: [],
                            growthRate: 0,
                            demandLevel: "Medium",
                            topSkills: [],
                            marketOutlook: "Neutral",
                            keyTrends: [],
                            recommendedSkills: [],
                            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),

                        },
                    });
                }

                // UPDATE USER INSDUSTRY
                const updatedUser = await tx.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        industry: data.industry,
                        experience: data.experience,
                        bio: data.bio,
                        skills: data.skills,
                    },
                });

                return (updatedUser, industryInsight);

            }//tx
            // {
            //     timeout: 10000, // default: 5000
            // }

        )//transaction
        return {success:true, ...result};
    } catch (error) {
        console.error("Error updating user and industry:", error.message);
        throw new Error("Failed to update profile"+error.message);
    }

}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}