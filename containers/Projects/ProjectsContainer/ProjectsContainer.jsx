import React from "react";
import Link from "next/link";

import styles from "./ProjectsContainer.module.css";
import Card from "../../../components/Card";

const ProjectsContainer = (props) => {
    const cards = [];
    for (let i = 0; i < 5; i++) {
        cards.push(
            <Card
                key={i}
                title={`Test ${i}`}
                img="/test.png"
                description={`Test description text for item number ${
                    i + 1
                }. More info can be found over here`}
            >
                <Link href="https://www.github.com">
                    <a>Github</a>
                </Link>
            </Card>
        );
    }
    return <div className={styles.Grid + " BorderedBox"}>{cards}</div>;
};

export default ProjectsContainer;
