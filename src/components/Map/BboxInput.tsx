import React from "react";

import { Button } from "../Button";
import { Input } from "../Input";
import Tooltip from "../Tooltip";
import { Bbox } from "../../types/map.type";
import { MockLocations } from "../../utils/constants";
import { isValidBox } from "../../utils/validateBBox";

export type BboxInput = {
  bbox: Bbox | null;
  setBbox: (value: Bbox) => void;
  handleFill: () => void;
  handleSubmit: () => void;
};

export const BboxInput = ({ bbox, setBbox, handleFill, handleSubmit }: BboxInput) => {
  const handleInputChange = (key: keyof Bbox, value: number) => {
    setBbox({ ...bbox, [key]: value } as Bbox);
  };

  const handleRandomBBox = () => {
    const randomIndex = (Math.floor(Math.random() * 100)) % 10;
    const randomBBox: Bbox = MockLocations[randomIndex];
    setBbox(randomBBox);
  };

  return (
    <div className="absolute bottom-20 left-1/2 w-3/4 z-[900] bg-white p-3 rounded -translate-x-1/2">
      <div className="flex gap-2">
        <Input
          label="N"
          value={String(bbox?.max_lat) || ""}
          type="number"
          placeholder={" 48.142 (max_lat)"}
          onChange={(e) => handleInputChange("max_lat", Number(e.target.value))}
        />
        <Input
          label="S"
          value={String(bbox?.min_lat) || ""}
          type="number"
          placeholder=" 48.14 (min_lat)"
          onChange={(e) => handleInputChange("min_lat", Number(e.target.value))}
        />
        <Input
          label="W"
          value={String(bbox?.min_lon) || ""}
          type="number"
          placeholder=" 12.54 (min_lon)"
          onChange={(e) => handleInputChange("min_lon", Number(e.target.value))}
        />
        <Input
          label="E"
          value={String(bbox?.max_lon) || ""}
          type="number"
          placeholder=" 12.541 (max_lon)"
          onChange={(e) => handleInputChange("max_lon", Number(e.target.value))}
        />
      </div>
      <div className="mt-2 flex items-center justify-end gap-2">
        <Button onClick={handleSubmit} disabled={!isValidBox(bbox)}>Submit</Button>
        <Tooltip
          message={
            <span>
              You need to give <strong>bbox</strong> values. (North,South,East,West).
              For give an example, I've filled the inputs for you. Don't forget, the maximum bbox size is <strong>0.25.</strong> It's simple right?
            </span>
          }
        >
          <Button onClick={handleFill}>Help?</Button>
        </Tooltip>
        <Tooltip message="Generate random bbox value.">
          <Button onClick={handleRandomBBox}>Random</Button>
        </Tooltip>
      </div>
    </div>
  );
};
