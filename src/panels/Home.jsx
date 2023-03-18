import React from "react";

import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Div,
} from "@vkontakte/vkui";

import { SkeletonAvatar, SkeletonText } from "../components/Skeleton";
import { GlobalContext } from "../context";
import { CoupleCard } from "../components/CoupleCard/CoupleCard";

const Home = ({ id, fetchedUser }) => {
  return (
    <Panel id={id}>
      <PanelHeader>EDU.vk</PanelHeader>
      <div />
      <div
        style={{
          maxWidth: 600,
          width: "100%",
          marginInline: "auto",
          marginTop: 20,
        }}
      >
        <CoupleCard
          subject={"Математика сложнейших"}
          teacher={{ name: "Ирина Чумак", degree: "к.ф.м" }}
          count={1}
          time={{ from: "10:00", to: "10:50" }}
          type={"практика"}
          room={123}
        />
      </div>
    </Panel>
  );
};

export default Home;
