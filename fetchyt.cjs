const https = require('https');
const fs = require('fs');

const channels = [
  { handle: 'MrBeast', username: 'MrBeast6000', userId: 'UCX6OQ3DkcsbYNE6H8uQQuVA' },
  { handle: 'tseries', username: 'tseries', userId: 'UCq-Fj5jknLsUf-MWSy4_brA' },
  { handle: 'CoComelon', username: 'checkgate', userId: 'UCbCmjCuTUZos6Inko4u57UQ' },
  { handle: 'SETIndia', username: 'setindia', userId: 'UCpEhnqL0y41EpW2TvWAHD7Q' },
  { handle: 'VladandNiki', username: 'VladandNiki', userId: 'UCvlE5gTbOvjiolFlEm-c_Ow' },
  { handle: 'KidsDianaShow', username: 'KidsDianaShow', userId: 'UCk8GzjMOrta8yxDcKfylJYw' },
  { handle: 'LikeNastyaofficial', username: 'LikeNastyaofficial', userId: 'UCJplp5SjeGSdVdwsfb9Q7lQ' },
  { handle: 'ZeeMusicCompany', username: 'zeemusiccompany', userId: 'UCFFbwnve3yF62-tVXkTyHqg' },
  { handle: 'PewDiePie', username: 'PewDiePie', userId: 'UC-lHJZR3Gqxm24_Vd_AJ5Yw' },
  { handle: 'WWEFanNation', username: 'WWEFanNation', userId: 'UCJ5v_MCY6GNUBTO8-D3XoAg' },
];

function fetchAvatar(handle) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'www.youtube.com',
      path: '/@' + handle,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0' }
    };
    https.get(options, (res) => {
      let data = '';
      res.on('data', (d) => { data += d; });
      res.on('end', () => {
        const match = data.match(/"thumbnails":\[{"url":"(https:\/\/yt3\.googleusercontent\.com\/[^"]+)"/);
        if (match) {
          resolve(match[1]);
        } else {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function main() {
  const results = {};
  for (const ch of channels) {
    const url = await fetchAvatar(ch.handle);
    results[ch.userId] = url;
    console.log(ch.handle, '->', url ? url.substring(0, 60) + '...' : 'NOT FOUND');
  }
  fs.writeFileSync('avatar_results.json', JSON.stringify(results, null, 2));
}

main();
