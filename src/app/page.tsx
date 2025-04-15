import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div>
        <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
          <div className="mx-auto mt-5 max-w-2xl text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Welcome Buddy
            </h1>
          </div>
          <div className="mx-auto mt-5 max-w-3xl text-center">
            <p className="text-muted-foreground text-xl">
              We will help you monitor all your financial decisions so that you
              don&apos;t end up broke once you start earning. We will help you
              track your expenses and income so that you can make better
              decisions in the future
            </p>
          </div>
          <div className="mt-8 flex justify-center gap-3">
            <Button size={"lg"}>Get started</Button>
          </div>
        </div>
      </div>
    </>
  );
}
