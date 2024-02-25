import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  return (
    <div className='max-w-xl mx-auto py-24'>
      <div>
        <h2 className='text-2xl font-bold mb-4'>Frequently Asked Questions</h2>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Do I have to include the word {'Lego'} in my prompt?</AccordionTrigger>
          <AccordionContent>
            Yes. Including the word lego in your prompt will give you the best results. It&apos;s best to structure prompts like {"a lego house"} or {"george washington as a lego"} or {"a lego model of the eiffel tower"}.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
