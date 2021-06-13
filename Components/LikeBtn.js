import { Provider, LikeButton, ClapButton } from "@lyket/react";

function LikeBtn({ api_key, data }) {
  return (
    <div className="justify-center p-6 flex flex-row">
      <Provider apiKey={api_key}>
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
