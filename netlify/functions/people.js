const path = require("path");
const Database = require('better-sqlite3');

exports.handler = async (event, context) => {
  // const sqliteFile = path.join(__dirname, 'mydb.sqlite'); // SQLite 파일의 경로
  // Nuxt.js 프로젝트의 루트 디렉토리 경로
  const rootDir = process.cwd();

  // SQLite 파일의 경로
  const sqliteFile = path.resolve(rootDir, 'netlify/functions/data/mydb.sqlite');
  console.log("sqliteFile: ", sqliteFile);

  try {
    // SQLite 데이터베이스 연결
    const db = await new Database(sqliteFile); // 데이터베이스 파일 경로

    // 데이터베이스에서 데이터 가져오는 쿼리 실행
    const queryResults = db.prepare('SELECT * FROM Person').all();

    // 쿼리 결과 반환
    db.close();
    return {
      statusCode: 200,
      body: JSON.stringify(queryResults),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
