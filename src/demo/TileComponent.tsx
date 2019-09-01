import React from "react";

export const TileComponent: React.FC<{ config: any }> = () => (
  <div className="app-tile">
    {[...new Array(3)].map((_, i) => (
      <p key={i}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non magna pulvinar, congue
        felis nec, fringilla arcu. Interdum et malesuada fames ac ante ipsum primis in faucibus.
        Aliquam erat volutpat. In rhoncus efficitur finibus. Donec blandit diam in tempor posuere.
        In lobortis blandit turpis nec condimentum. Maecenas bibendum odio in mi dignissim, at
        bibendum nulla vestibulum. Phasellus et mattis ante, ut varius tortor. Etiam tristique
        tortor ac aliquet egestas. Phasellus et posuere eros, feugiat finibus tortor. Cras nisi
        urna, dapibus non turpis et, malesuada commodo nisl. Ut luctus faucibus lacus, sit amet
        rhoncus metus rhoncus ac.
      </p>
    ))}
  </div>
);
