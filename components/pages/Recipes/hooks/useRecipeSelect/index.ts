import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../../hooks/redux";

import recipes from "../../Data";
import { reset } from "../../../../../slices/recipe";

const useRecipeSelect = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [selected, setSelected] = React.useState("");

  // Select based on url
  React.useEffect(() => {
    if (!router.query.id) {
      return;
    }

    const key = router.query.id as string;
    if (!(key in recipes)) {
      router.replace("/recipes");
      return;
    }

    dispatch(reset());
    setSelected(key);
  }, [router, dispatch]);

  return selected;
};

export default useRecipeSelect;
