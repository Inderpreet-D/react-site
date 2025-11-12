import CardStateProvider from "../providers/CardStateProvider";

import SectionControls from "../SectionControls";
import ComboSection from "../ComboSection";
import CardSection from "../CardSection";

const CardSections: React.FC = () => (
  <CardStateProvider>
    <SectionControls />

    <ComboSection />

    <CardSection cardKey="commanders" isCommander>
      Commander Options / Sideboard
    </CardSection>

    <CardSection cardKey="others">Deck</CardSection>

    <CardSection cardKey="tokens" disableControls>
      Tokens / Miscellaneous
    </CardSection>
  </CardStateProvider>
);

export default CardSections;
