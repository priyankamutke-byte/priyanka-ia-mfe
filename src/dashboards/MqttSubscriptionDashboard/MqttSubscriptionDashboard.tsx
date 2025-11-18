import * as React from 'react';
import { useMessaging } from '@clearblade/ia-mfe-react';
import {
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';

interface Message {
  topic: string;
  payload: string;
  timestamp: number;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    maxWidth: 1200,
    margin: '0 auto',
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  controls: {
    display: 'flex',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  table: {
    marginTop: theme.spacing(2),
  },
  noMessages: {
    textAlign: 'center',
    padding: theme.spacing(3),
  },
}));

export const MqttSubscriptionDashboard: React.FC = () => {
  const classes = useStyles();
  const [topic, setTopic] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);

  const handleMessage = React.useCallback((topic: string, msg: any) => {
    const newMessage: Message = {
      topic,
      payload: JSON.stringify(msg.payload, null, 2),
      timestamp: Date.now(),
    };
    setMessages((prev) => [newMessage, ...prev]);
  }, []);

  const { status } = useMessaging({
    topics: isSubscribed && topic ? [topic] : [],
    onMessageReceived: handleMessage,
    callbackId: 'mqtt-subscription-dashboard',
  });

  const handleSubscribe = React.useCallback(() => {
    if (!topic) return;
    setIsSubscribed(!isSubscribed);
  }, [topic, isSubscribed]);

  const handleClear = React.useCallback(() => {
    setMessages([]);
  }, []);

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" className={classes.header}>
        MQTT Subscription Dashboard
      </Typography>

      <div className={classes.controls}>
        <TextField
          label="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          disabled={isSubscribed}
        />
        <Button
          variant="contained"
          color={isSubscribed ? "primary" : "secondary"}
          onClick={handleSubscribe}
          disabled={!status.hasLiveUpdates}
        >
          {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
        </Button>
        <Button
          variant="contained"
          onClick={handleClear}
          color="primary"
        >
          Clear Messages
        </Button>
      </div>

      {!status.hasLiveUpdates && (
        <Typography variant="subtitle1" color="error">
          Messaging service is not available
        </Typography>
      )}

      {isSubscribed && topic && (
        <Typography variant="subtitle1">
          Currently subscribed to: {topic}
        </Typography>
      )}

      <TableContainer className={classes.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Topic</TableCell>
              <TableCell>Payload</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className={classes.noMessages}>
                  No messages received
                </TableCell>
              </TableRow>
            ) : (
              messages.map((message, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(message.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{message.topic}</TableCell>
                  <TableCell>{message.payload}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}; 