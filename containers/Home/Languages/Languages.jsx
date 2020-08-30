import React from "react";

import Section from "../../../components/Section";
import SectionData from "../../../components/Section/SectionData";

const Languages = (props) => {
    const experience = {
        Python: "10 Years",
        Java: "8 Years",
        C: "3 Years",
        JavaScript: "2 Years",
        "HTML / CSS": "2 Years",
        "C#": "2 Years",
        PHP: "1 Year",
        SQL: "1 Year",
        Kotlin: "1 Year",
    };

    let data = Object.keys(experience).map((key) => (
        <SectionData key={key} title={key} data={experience[key]} />
    ));

    return <Section title="Languages">{data}</Section>;
};

export default Languages;
