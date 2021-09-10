import { Provider, LikeButton, ClapButton } from "@lyket/react";
import { useTheme } from "next-themes";

function LikeBtn({ api_key, data }) {
  const { theme } = useTheme();

  return (
    <div className="justify-center p-6 flex flex-row">
      <Provider
        apiKey={api_key}
        theme={{
          colors: {
            icon: "#7e7c7c",
            text: theme == "dark" ? "#d1d5db" : "black",
          },
        }}
      >
        <div className="p-4">
          <LikeButton
            namespace="Blog-like"
            id={String(data.Id)}
            component={LikeButton.templates.Twitter}
            className="focus:outline-none"
          />
        </div>

        <div className="p-4 self-center">
          <ClapButton
            namespace="Blog-clap"
            id={String(data.Id)}
            component={ClapButton.templates.Heart}
            className="focus:outline-none"
          />
        </div>
      </Provider>
    </div>
  );
}

export default LikeBtn;
