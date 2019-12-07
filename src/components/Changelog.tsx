import React from 'react';

const Changelog: React.FC = () => {
  return (
    <>
      <h3>Changelog</h3>
      <hr />
      <ul>
        <li>
          <h4>0.0.2 (2019-08-28)</h4>
          <ul>
            <li>Technically the first one, so everything is new 🥳</li>
          </ul>
        </li>
        <li>
          <h4>0.1.0 (2019-11-30)</h4>
          <ul>
            <li>Brand new dark theme</li>
            <li>Brand new layout system</li>
          </ul>
        </li>
        <li>
          <h4>0.2.0 (2019-12-7)</h4>
          <ul>
            <li>
              Fix painting inconsistencies between the preview and the current
              layer
            </li>
            <li>
              Improve Welcome window, making it easier to close, just by
              clicking outside of it
            </li>
            <li>Add a small padding to the default size of the canvas</li>
          </ul>
        </li>
      </ul>

      <p style={{ textAlign: 'center' }}>
        © 2019 <a href="https://twitter.com/_albizures">Jose Albizures</a>
      </p>
      <p style={{ textAlign: 'center' }}>
        <a
          className="github-button"
          href="https://github.com/pixore/pixore"
          data-size="large"
          data-show-count="true"
          aria-label="Star pixore/pixore on GitHub"
        >
          Star
        </a>
      </p>
    </>
  );
};

export default Changelog;
