import {Container} from "@/components/Container";


export function Footer() {
  return (
    <footer className="py-12 md:py-24">
      <Container>
        <p className='text-center text-zinc-400 text-xl font-thin'>made by <a href="https://twitter.com/marydotdev" target='_blank' className='hover:underline hover:text-blue-500 hover:italic'>mary</a></p>
      </Container>
    </footer>
  );
}
