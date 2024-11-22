import React from 'react';

import './Instruction.css'

const Step1Instruction: React.FC = () => {
  return (
    <div className='instructions'>
      <div className='instructionsLeft'>
        <h3 style={{ fontSize: "30px", margin: 0 }}>File Structure Requirements for ROM Transfers</h3>
        <p className='smallText' style={{ marginBottom: "1%" }}>
          To ensure successful ROM transfers using the script, the USB file structure must follow this specific format.
        </p>
        <ul className='smallText'>
          <li style={{ marginTop: "1%", marginBottom: "1%" }}>
            <b style={{ fontFamily: "Teko", fontSize: "24px" }}>Folders:</b> Specific directories must be used for each console (e.g., <i>psx</i> for PS1,
            <i> megadrive</i> for Sega Mega Drive/Genesis).
          </li>
          <li style={{ marginTop: "1%" }}>
            <b style={{ fontFamily: "Teko", fontSize: "24px" }}>File Format:</b> Keep games in their original compressed formats (<i>.zip</i>, <i>.7z</i>).
          </li>
        </ul>
      </div>
      <div className='instructionsRight'>
        <pre className='fileText'>
          <b className='folder' style={{ margin: 0 }}>/RetroPie/</b>
          <br />
          <b className='folder'>|- nes</b>/
          <div className='filename'>|- Super Mario Bros.zip</div>
          <div className='filename'>|- The Legend of Zelda.zip</div>
          <b className='folder'>|- snes</b>/
          <div className='filename'>|- Donkey Kong Country.zip</div>
          <div className='filename'>|- Super Mario World.zip</div>
          <b className='folder'>|- n64</b>/
          <div className='filename'>|- The Legend of Zelda - Ocarina of Time.zip</div>
          <div className='filename'>|- Super Smash Bros.zip</div>
          <b className='folder'>|- dreamcast</b>/
          <div className='filename'>|- Sonic Adventure.zip</div>
          <div className='filename'>|- Crazy Taxi.zip</div>
          <b className='folder'>|- psp</b>/
          <div className='filename'>|- God of War - Chains of Olympus.zip</div>
          <div className='filename'>|- Grand Theft Auto - Vice City Stories.zip</div>
          <b className='folder'>|- psx</b>/
          <div className='filename'>|- Final Fantasy VII.7z</div>
          <div className='filename'>|- Resident Evil 2.7z</div>
          <b className='folder'>|- nds</b>/
          <div className='filename'>|- New Super Mario Bros.zip</div>
          <div className='filename'>|- Pokémon Diamond.zip</div>
          <b className='folder'>|- megadrive</b>/
          <div className='filename'>|- Sonic the Hedgehog.zip</div>
          <div className='filename'>|- Streets of Rage.zip</div>
        </pre>
      </div>

    </div>
  );
};

export default Step1Instruction;
