import { Placeholder } from 'react-bootstrap';

const ChannelsSkeleton = () => (
  <>
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <Placeholder as="div" animation="glow">
        <Placeholder xs={4} />
      </Placeholder>
    </div>
    <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {[1, 2, 3, 4, 5].map((i) => (
        <li key={i} className="nav-item w-100 mb-2">
          <Placeholder as="div" animation="glow">
            <Placeholder xs={12} className="rounded" style={{ height: '40px' }} />
          </Placeholder>
        </li>
      ))}
    </ul>
  </>
);

export default ChannelsSkeleton;
