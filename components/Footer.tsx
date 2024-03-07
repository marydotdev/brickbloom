import {Container} from "@/components/Container";


export function Footer() {
  return (
    <footer className="">
      <div className="w-full h-full">
        <Container>
          <div className="border-t mt-10 py-6 md:py-12">

            <div>
              <p className="text-zinc-400 text-xs md:text-sm text-center balanced w-fit mx-auto">
                Made by{" "}
                <a
                  href="https://twitter.com/marydotdev"
                  target="_blank"
                  className="hover:underline hover:text-blue-500 hover:italic"
                >
                  Mary
                </a>
              </p>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
