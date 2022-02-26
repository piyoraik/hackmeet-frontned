import { Card } from "@/components/atoms/Card";
import { Channel } from "@/types/channel.type";
import { chakra, List, ListIcon, ListItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { GrConnect } from "react-icons/gr";
import { MdCable } from "react-icons/md";

interface Props {
  channels: Channel[];
  workspaceId: string;
}

export const ChannelMenu: React.VFC<Props> = ({ channels, workspaceId }) => {
  const router = useRouter();

  return (
    <Card title="Channel">
      <List spacing={3}>
        {channels.map((channel, idx) => (
          <ListItem key={idx}>
            <chakra.button
              onClick={() =>
                router.push(`/workspace/${workspaceId}/${channel.id}`)
              }
            >
              <ListIcon as={MdCable} color="blue.600" />
              {channel.name}
            </chakra.button>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
