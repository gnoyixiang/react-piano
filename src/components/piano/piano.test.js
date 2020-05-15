import { configure, mount } from "enzyme";
import { act } from "react-dom/test-utils";
import Adapter from "enzyme-adapter-react-16";
import expect from "expect";
import sinon from "sinon";
import React from "react";

import Piano from "./Piano";
import BlackKey from "./pianoKeys/BlackKey";
import NaturalKey from "./pianoKeys/NaturalKey";

configure({ adapter: new Adapter() });

describe("Piano", () => {
  describe("rendering of component", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(<Piano notes={sampleNotes.first} />);
    });
    afterAll(() => (wrapper = null));
    it("should check keys on the piano are correctly aligned in sequential order", () => {
      const pianoInstance = wrapper.find(Piano);
      expect(pianoInstance.text()).toEqual("AB#BC#CD#DEF");
    });

    it("should check keys are distinguised perfectly between white and black keys", () => {
      const blackKeyInstances = wrapper.find(BlackKey);
      const whiteKeyInstances = wrapper.find(NaturalKey);

      expect(blackKeyInstances.length).toEqual(3);
      expect(whiteKeyInstances.length).toEqual(6);

      expect(blackKeyInstances.at(0).text()).toEqual("B#");
      expect(blackKeyInstances.at(1).text()).toEqual("C#");
      expect(blackKeyInstances.at(2).text()).toEqual("D#");

      expect(whiteKeyInstances.at(0).text()).toEqual("A");
      expect(whiteKeyInstances.at(1).text()).toEqual("B");
      expect(whiteKeyInstances.at(2).text()).toEqual("C");
      expect(whiteKeyInstances.at(3).text()).toEqual("D");
      expect(whiteKeyInstances.at(4).text()).toEqual("E");
      expect(whiteKeyInstances.at(5).text()).toEqual("F");
    });
  });

  describe("playing/pressing of keys", () => {
    it("should play correct keys (whether black or white) when key is clicked/pressed", () => {
      const spyClickFunction = sinon.spy();

      const wrapper = mount(
        <Piano notes={sampleNotes.first} onKeyPressed={spyClickFunction} />
      );

      // we now simulate a press on both black key and white key, and check if the spy function was called
      wrapper.find(NaturalKey).first().simulate("click"); // A
      wrapper.find(BlackKey).first().simulate("click"); // B#

      sinon.assert.calledTwice(spyClickFunction);
      sinon.assert.calledWith(spyClickFunction, "A");
      sinon.assert.calledWith(spyClickFunction, "B#");
    });

    it("should play correct key when key is specified (user doesnt have to click)", () => {
      const spyClickFunction = sinon.spy();

      const pianoRef = React.createRef();
      mount(
        <Piano
          ref={pianoRef}
          notes={sampleNotes.first}
          onKeyPressed={spyClickFunction}
        />
      );

      act(() => {
        pianoRef.current.pressNote("D#");
      });

      sinon.assert.calledOnce(spyClickFunction);
      sinon.assert.calledWith(spyClickFunction, "D#");
    });
  });
});

const sampleNotes = {
  first: [
    { keyNote: "A" },
    { keyNote: "B#", isSharpOrFlatKey: true },
    { keyNote: "B" },
    { keyNote: "C#", isSharpOrFlatKey: true },
    { keyNote: "C" },
    { keyNote: "D#", isSharpOrFlatKey: true },
    { keyNote: "D" },
    { keyNote: "E" },
    { keyNote: "F" },
  ],
};
