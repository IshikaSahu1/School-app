import express from 'express';
import pool from '../db.js';
import Joi from 'joi';

const router = express.Router();

const addSchoolSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required()
});

const listSchoolsSchema = Joi.object({
  lat: Joi.number().min(-90).max(90).required(),
  lng: Joi.number().min(-180).max(180).required()
});

router.post('/addSchool', async (req, res) => {
  try {
    const { error, value } = addSchoolSchema.validate(req.body);
    if (error) return res.status(400).json({ ok: false, message: error.details[0].message });

    const { name, address, latitude, longitude } = value;
    const [result] = await pool.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );

    res.status(201).json({ ok: true, message: 'School added successfully', data: { id: result.insertId, name, address, latitude, longitude } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Internal server error' });
  }
});

router.get('/listSchools', async (req, res) => {
  try {
    const { error, value } = listSchoolsSchema.validate({ lat: Number(req.query.lat), lng: Number(req.query.lng) });
    if (error) return res.status(400).json({ ok: false, message: error.details[0].message });

    const { lat, lng } = value;

    const sql = `
      SELECT id, name, address, latitude, longitude,
      (6371 * ACOS(
        COS(RADIANS(?)) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(?)) +
        SIN(RADIANS(?)) * SIN(RADIANS(latitude))
      )) AS distance_km
      FROM schools
      ORDER BY distance_km ASC
    `;

    const [rows] = await pool.execute(sql, [lat, lng, lat]);
    res.json({ ok: true, count: rows.length, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Internal server error' });
  }
});

export default router;
