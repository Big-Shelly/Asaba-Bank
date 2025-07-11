import type { NextApiRequest, NextApiResponse } from 'next';

type GeoResponse = {
  country_code?: string;
  country_name?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = Array.isArray(forwarded) ? forwarded[0].split(',')[0] : forwarded?.split(',')[0] || 'unknown';

  try {
    const geoRes = await fetch(`https://ipapi.co/${ip}/json`);
    const geo: GeoResponse = await geoRes.json();

    const allowed = geo.country_code === 'US';

    return res.status(allowed ? 200 : 403).json({
      allowed,
      country: geo.country_name || 'Unknown',
      ip,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch geolocation' });
  }
}
