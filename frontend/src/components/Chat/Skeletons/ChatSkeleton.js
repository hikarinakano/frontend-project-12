import { Card, Placeholder } from 'react-bootstrap';

const ChatSkeleton = () => (
  <div className="d-flex flex-column h-100">
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <Placeholder as="p" animation="glow" className="m-0">
        <Placeholder xs={3} />
      </Placeholder>
      <Placeholder as="span" animation="glow">
        <Placeholder xs={2} />
      </Placeholder>
    </div>

    <div className="chat-messages overflow-auto px-5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="mb-2">
          <Placeholder as="div" animation="glow">
            <Placeholder xs={1} className="me-2" />
            <Placeholder xs={8} />
          </Placeholder>
        </div>
      ))}
    </div>

    <div className="mt-auto px-5 py-3">
      <Card className="py-1 border rounded-2">
        <Placeholder as="div" animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
      </Card>
    </div>
  </div>
);

export default ChatSkeleton;
