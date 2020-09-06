import Section from "../../../components/Section";
import DataSection from "../../../components/Section/DataSection";

const Technologies = ({ expanded, clickHandler }) => {
    const experience = {
        Android: "5 Years",
        Latex: "5 Years",
        "Web Development": "4 Years",
        Unity: "3 Years",
        "Virtual Reality": "2 Years",
        Unreal: "1 Year",
        MySQL: "1 Year",
        NodeJS: "8 Months",
        ReactJS: "2 Months",
    };

    let data = Object.keys(experience).map((key) => (
        <DataSection key={key} title={key} value={experience[key]} />
    ));

    return (
        <Section
            title="Technologies"
            data={data}
            expanded={expanded}
            clickHandler={clickHandler}
        />
    );
};

export default Technologies;
