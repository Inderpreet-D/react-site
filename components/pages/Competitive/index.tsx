import { isEqual } from "lodash";

import Container from "../../atoms/Container";
import ContainerBackButton from "../../atoms/ContainerBackButton";
import ContainerTitle from "../../atoms/ContainerTitle";
import LoadingIcon from "../../atoms/LoadingIcon";
import HorizontalList from "../../atoms/HorizontalList";
import HorizontalListButton from "../../atoms/HorizontalListButton";
import ContainerSectionSeparator from "../../atoms/ContainerSectionSeparator";
import Rules from "./Rules";
import Games from "./Games";
import Leaderboard from "./Leaderboard";

import useSWR from "../../../hooks/useSWR";

export type PlayerObj = {
  [x: string]: string;
};

export type Game = {
  month: number;
  day: number;
  players: PlayerObj;
  winner?: string;
};

export interface Season {
  name: string;
  year: number;
  games: Game[];
  rules: string[];
}

const meme = `
———————————— No games? ———————————
⠀⣞⢽⢪⢣⢣⢣⢫⡺⡵⣝⡮⣗⢷⢽⢽⢽⣮⡷⡽⣜⣜⢮⢺⣜⢷⢽⢝⡽⣝
⠸⡸⠜⠕⠕⠁⢁⢇⢏⢽⢺⣪⡳⡝⣎⣏⢯⢞⡿⣟⣷⣳⢯⡷⣽⢽⢯⣳⣫⠇
⠀⠀⢀⢀⢄⢬⢪⡪⡎⣆⡈⠚⠜⠕⠇⠗⠝⢕⢯⢫⣞⣯⣿⣻⡽⣏⢗⣗⠏⠀ 
⠀⠪⡪⡪⣪⢪⢺⢸⢢⢓⢆⢤⢀⠀⠀⠀⠀⠈⢊⢞⡾⣿⡯⣏⢮⠷⠁⠀⠀⠀
⠀⠀⠀⠈⠊⠆⡃⠕⢕⢇⢇⢇⢇⢇⢏⢎⢎⢆⢄⠀⢑⣽⣿⢝⠲⠉⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⡿⠂⠠⠀⡇⢇⠕⢈⣀⠀⠁⠡⠣⡣⡫⣂⣿⠯⢪⠰⠂⠀⠀⠀⠀
⠀⠀⠀⠀⡦⡙⡂⢀⢤⢣⠣⡈⣾⡃⠠⠄⠀⡄⢱⣌⣶⢏⢊⠂⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⢝⡲⣜⡮⡏⢎⢌⢂⠙⠢⠐⢀⢘⢵⣽⣿⡿⠁⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠨⣺⡺⡕⡕⡱⡑⡆⡕⡅⡕⡜⡼⢽⡻⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⣼⣳⣫⣾⣵⣗⡵⡱⡡⢣⢑⢕⢜⢕⡝⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣴⣿⣾⣿⣿⣿⡿⡽⡑⢌⠪⡢⡣⣣⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⡟⡾⣿⢿⢿⢵⣽⣾⣼⣘⢸⢸⣞⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠁⠇⠡⠩⡫⢿⣝⡻⡮⣒⢽⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
——————————————————————————————————
`;

const Page = () => {
  const { data: seasons, isLoading } = useSWR<Season[]>("competitive");

  const [season, setSeason] = React.useState<Season | null>(null);
  const [game, setGame] = React.useState<Game | null>(null);

  const selectGame = React.useCallback((newVal: Game | null) => {
    setGame((old) => (isEqual(old, newVal) ? null : newVal));
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <Container>
      <ContainerBackButton to="mtg" />

      <ContainerTitle>Competitive</ContainerTitle>

      {isLoading ? (
        <LoadingIcon />
      ) : (
        <>
          <HorizontalList>
            {(seasons ?? []).map((s, i) => {
              const selected = isEqual(s, season);

              return (
                <HorizontalListButton
                  key={i}
                  active={selected}
                  onClick={() => {
                    setSeason(selected ? null : s);
                    setGame(null);
                  }}
                >
                  {s.name ?? `Season ${i + 1}`}
                </HorizontalListButton>
              );
            })}
          </HorizontalList>

          <ContainerSectionSeparator />

          {season && (
            <>
              <Rules rules={season.rules} />

              <ContainerSectionSeparator />

              {season.games ? (
                <>
                  <Games
                    game={game}
                    games={season.games}
                    year={season.year}
                    selectGame={selectGame}
                  />

                  <ContainerSectionSeparator />

                  <Leaderboard season={season} />
                </>
              ) : (
                <div>
                  <pre className="w-fit mx-auto mt-[-1rem]">{meme}</pre>
                </div>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Page;
