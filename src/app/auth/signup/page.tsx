"use client";

import { signupContainer, signupWrapper } from "./styles/signup.css";
import { heading2, semiBold } from "@/app/styles/font.css";
import { paddingSprinkles } from "@/app/styles/padding.css";
import Image from "next/image";
import { pointer } from "@/app/styles/global.css";
import { useRouter } from "next/navigation";
import SignupPopup from "./components/signupPopup";
import SignupForm from "./components/signupForm";

const Page = () => {
  const router = useRouter();

  return (
    <>
      <SignupPopup />
      <section className={signupWrapper}>
        <article className={signupContainer}>
          <div>
            <div className={`${paddingSprinkles({ paddingBottom: "s32" })} ${pointer}`}>
              <Image
                src="/svgs/prev.svg"
                alt="back"
                width={17}
                height={21}
                onClick={() => {
                  router.push("/");
                }}
              />
            </div>

            <div className={paddingSprinkles({ paddingBottom: "s32" })}>
              <h3 className={`${semiBold} ${heading2}`}>
                회원가입을
                <br /> 시작 할까요?
              </h3>
            </div>

            <SignupForm />
          </div>
        </article>
      </section>
    </>
  );
};

export default Page;
