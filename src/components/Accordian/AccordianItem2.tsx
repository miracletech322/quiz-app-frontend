import { AccordionItem as Item } from "@szhsin/react-accordion";
import chevron from "./../../images/chevron-down.svg";

const AccordionItem = ({ header, result, date, ...rest }) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <>
        <label className="xl:w-2/3 py-2 mb-2.5 block text-black dark:text-white">{header.slice(0,80)}...</label>
        {
          result=="Right" ?
            <div className="inline-flex rounded-full ml-auto bg-opacity-10 py-2 px-3 text-sm font-medium bg-success text-success">{result}</div>
            :
            <div className="inline-flex rounded-full ml-auto bg-opacity-10 py-2 px-3 text-sm font-medium bg-danger text-danger">{result}</div>
        }

        <p className="inline-flex rounded-full ml-auto bg-opacity-10 py-2 px-3 text-sm font-medium ">{date}</p>
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