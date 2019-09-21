/**
 * Tone.js
 * @author Yotam Mann
 * @license http://opensource.org/licenses/MIT MIT License
 * @copyright 2014-2019 Yotam Mann
 */
import { version } from "../version";
import { theWindow } from "./context/AudioContext";
import { assert, log } from "./util/Debug";

//-------------------------------------
// 	TONE
//-------------------------------------

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseToneOptions {}

/**
 * @class  Tone is the base class of all other classes.
 * @constructor
 */
export abstract class Tone {

	/**
	 * The version number semver
	 */
	static version: string = version;

	/**
	 * The name of the class
	 */
	protected abstract name: string;

	/**
	 * Returns all of the default options belonging to the class.
	 */
	static getDefaults(): BaseToneOptions {
		return {};
	}

	//-------------------------------------
	// 	DEBUGGING
	//-------------------------------------

	/**
	 * Set this debug flag to log all events that happen in this class.
	 */
	debug: boolean = false;

	/**
	 * Prints the outputs to the console log for debugging purposes.
	 * Prints the contents only if either the object has a property
	 * called `debug` set to true, or a variable called TONE_DEBUG_CLASS
	 * is set to the name of the class.
	 * @example
	 * //prints all logs originating from Tone.OscillatorNode
	 * Tone.global.TONE_DEBUG_CLASS = "OscillatorNode"
	 */
	protected log(...args: any[]): void {
		// if the object is either set to debug = true
		// or if there is a string on the Tone.global.with the class name
		if (this.debug || (theWindow && this.toString() === theWindow.TONE_DEBUG_CLASS)) {
			log(this, ...args);
		}
	}

	/**
	 * Assert that the statement is true, otherwise invoke the error.
	 * @param statement
	 * @param error The message which is passed into an Error
	 */
	protected assert(statement: boolean, error: string): void {
		assert(statement, error);
	}

	//-------------------------------------
	// 	DISPOSING
	//-------------------------------------

	/**
	 * Indicates if the instance was disposed
	 */
	private _wasDisposed: boolean = false;

	/**
	 * disconnect and dispose.
	 */
	dispose(): this {
		this._wasDisposed = true;
		return this;
	}

	/**
	 * Indicates if the instance was disposed. 'Disposing' an
	 * instance means that all of the Web Audio nodes that were
	 * created for the instance are disconnected and freed for garbage collection.
	 */
	get disposed(): boolean {
		return this._wasDisposed;
	}

	/**
	 * Convert the class to a string
	 * @example
	 * const osc = new Oscillator()
	 * osc.toString() // "Oscillator"
	 */
	toString(): string {
		return this.name;
	}
}
