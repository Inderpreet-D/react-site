import Section from "../../../components/Section";
import Article from "../../../components/Section/ArticleSection";

const Publications = ({ expanded, clickHandler }) => {
    const articles = [
        <Article
            key={0}
            title="A Novel Training Program to Improve Human Spatial Orientation: Preliminary Findings"
            authors={[
                "Michael M. G.",
                "Ford B.",
                "Inderpreet D.",
                "Adam R.",
                "Alberto U.",
                "Jaimy H.",
                "Kira D.",
                "Giuseppe I.",
            ]}
            me="Inderpreet D."
            description="A study that used a task I developed to test the feasibility of training programs to assist users in cognitive map
use and development"
            href="https://www.frontiersin.org/articles/10.3389/fnhum.2020.00005/full"
        />,
        <Article
            key={1}
            title="Body illusion and affordances: the influence of body representation on a walking imagery task in virtual reality"
            authors={[
                "Giorgia Tosi",
                "Jassleen Parmar",
                "Inderpreet Dhillon",
                "Angelo Maravita",
                "Giuseppe Iaria",
            ]}
            me="Inderpreet Dhillon"
            description="A study that made use of immersive Virtual Reality to observe the effects of body illusions on the participants estimation of distances"
            href="https://rd.springer.com/article/10.1007%2Fs00221-020-05874-z"
        />,
    ];

    const output = [];
    let key = 0;
    for (const date of articles) {
        output.push(date);
        if (key !== articles.length - 1) {
            output.push(<hr key={key + articles.length} />);
        }
        key++;
    }

    return (
        <Section
            title="Publications"
            data={output}
            expanded={expanded}
            clickHandler={clickHandler}
        />
    );
};

export default Publications;
