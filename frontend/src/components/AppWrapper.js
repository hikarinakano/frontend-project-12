const AppWrapper = ({ children }) => (
  <div className="h-100">
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100 bg-light">
        {children}
      </div>
    </div>
  </div>
);

export default AppWrapper;
