'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Patient = use('App/Models/Patient');

/**
 * Resourceful controller for interacting with patients
 */
class PatientController {
  //Show a list of all the patients.
  async index ({ response }) {
    const allPatients = await Patient.all();

    return allPatients;
  }


  //Create/save a new patient.
  async store ({ request, response }) {
    const data = request.all();
    const patient = await Patient.create(data);

    console.log(patient);

    return patient;
  }

  //Display a single patient
  async show ({ params, request, response }) {
    const {nip} = params;
    const patient = await Patient.findOrFail(nip);

    return patient;
  }
//Update patient details.
  async update ({ params, request, response }) {
    const {nip} = params;
    const patient = await Patient.findOrFail(nip);
    const data = request.all();

    patient.merge(data);

    patient.save();

    return patient;
  }
//Delete a patient with id.
  async destroy ({ params, request, response }) {
    const {nip} = params;
    const patient = await Patient.findOrFail(nip);
    
    console.log(await patient.delete());

    return response.ok({ message : `nip ${nip} deleted with sucess`});
  }
}

module.exports = PatientController