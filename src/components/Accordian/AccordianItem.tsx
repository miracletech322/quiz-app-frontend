import { AccordionItem as Item } from "@szhsin/react-accordion";
import chevron from "./../../images/chevron-down.svg";

const AccordionItem = ({ header, date, ...rest }) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <>
        <label className="xl:w-3/3 py-2 mb-2.5 block text-black dark:text-white">{header.slice(0, 90)}...</label>
        <p className="py-2 mb-2.5">{date}</p>
        <img
          className={`ml-auto transition-transform duration-200 ease-out ${isEnter && "rotate-180"

            }`}
          alt="Chevron"
          src={chevron}
        />
      </>
    )}
    className="border-b"
    buttonProps={{
      className: ({ isEnter }) =>
        // `flex w-full p-4 text-left bg-black hover:bg-slate-200 ${isEnter && "bg-slate-200"
        `flex w-full p-4 text-left hover:bg-slate-200 ${isEnter && "bg-slate-200"
        }`
    }}
    contentProps={{
      className: "transition-height duration-200 ease-out"
    }}
    panelProps={{ className: "p-4" }}
  />
);

export default AccordionItem;