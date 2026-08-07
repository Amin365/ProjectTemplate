export default function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <div className="page-loader__mark" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <p>Loading XalTech...</p>
    </div>
  );
}
