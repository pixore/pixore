import React from 'react';
const About: React.FC = () => {
  return (
    <>
      <h3>About Pixore (v0.0.4)</h3>
      <hr />
      <p>
        Hi, {"I'm"} Jose and welcome to Pixore, an editor for pixel art heavily
        inspired by <a href="https://www.aseprite.org">Aseprite</a>,{' '}
        <a href="https://www.piskelapp.com">Piskel app</a> and{' '}
        <a href="https://pyxeledit.com/">Pyxel edit</a>. Pixore has been on
        development for a couple of years, with some do-overs, starting as a
        vanilla.js project to a react project.
      </p>
      <p style={{ marginBottom: 40 }}>
        And since Pixore is an open source I would say the usual for open source
        projects, you can contribute to it as much as you like (or not{' '}
        {'¯\\_(ツ)_/¯'}), report any issue and give it a star, and if you{' '}
        {"don't"} know what {"I'm"} talking about you can just read the
        instructions bellow and/or close this window and start doing pixel art!
        🚀
      </p>

      <h3>Some obvious instructions (at least for me)</h3>
      <hr />
      <ul>
        <li>
          To paint (or draw 🤔) use the left click, with a single click or
          holding it and making a path
        </li>
        <li>Zoom in and out scrolling</li>
        <li>
          Right click is the same as the left, but for the secondary color (by
          default transparent)
        </li>
        <li>Use spacebar with right click to move the canvas</li>
      </ul>
      <h3>Some links</h3>
      <hr />
      <ul>
        <li>
          <a href="https://twitter.com/pixore_io">@pixore_io</a>
        </li>
        <li>
          <a href="https://github.com/pixore">Github organization</a>
        </li>
        <li>
          <a href="https://twitter.com/_albizures">@_albizures</a>
        </li>
        <li>
          <a href="https://github.com/albizures">My github</a>
        </li>
      </ul>
    </>
  );
};

export default About;
