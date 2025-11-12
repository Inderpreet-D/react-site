import ContainerSubTitle from "../../../atoms/ContainerSubTitle";
import Markdown from "../../../atoms/Markdown";

type RulesProps = {
  rules: string[];
};

type RuleType = "BAN" | "GENERAL";

const TYPE_SEPARATOR = "::";

const Rules: React.FC<RulesProps> = ({ rules }) => {
  return (
    <>
      <ContainerSubTitle>Rules</ContainerSubTitle>

      <ul className="list-decimal pl-6">
        {rules.map((rule, i) => {
          const [t, text] = rule.split(TYPE_SEPARATOR);
          const md = <Markdown markdown={text} />;

          if ((t as RuleType) === "BAN") {
            return (
              <li key={i} className="text-error-main mb-2 last:mb-0">
                {md}
              </li>
            );
          }

          return (
            <li key={i} className="text-primary-light mb-2 last:mb-0">
              {md}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Rules;
