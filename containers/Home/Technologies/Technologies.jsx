import React from "react";

import Section from "../../../components/Section";
import SectionData from "../../../components/Section/SectionData";

const Technologies = (props) => {
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
        <SectionData key={key} title={key} data={experience[key]} />
    ));

    return <Section title="Technologies">{data}</Section>;
};

export default Technologies;
