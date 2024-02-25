import {Container} from "@/components/Container";


export function Footer() {
  return (
    <footer className="">
      <div className="pt-12 pb-4 w-full h-full">
        <Container>
          <p className="text-zinc-400 text-xs md:text-sm text-center balanced w-fit mx-auto">
            made by{" "}
            <a
              href="https://twitter.com/marydotdev"
              target="_blank"
              className="hover:underline hover:text-blue-500 hover:italic"
            >
              mary
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
