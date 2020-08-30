import React from "react";

import Section from "../../../components/Section";
import SectionData from "../../../components/Section/SectionData";

const Technologies = (props) => {
    const experience = {
        Unity: "3 Years",
        Unreal: "1 Year",
        Android: "5 Years",
        "Web Development": "4 Years",
        MySQL: "1 Year",
        "Virtual Reality": "2 Years",
        Latex: "5 Years",
        ReactJS: "2 Months",
        NodeJS: "8 Months",
    };

    let data = Object.keys(experience).map((key) => (
        <SectionData key={key} title={key} data={experience[key]} />
    ));

    return <Section title="Technologies">{data}</Section>;
};

export default Technologies;
