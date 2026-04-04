
Veb-Təhlükəsizlik və SQL Injection Simulyasiyası

Bu layihə, müasir veb tətbiqlərində rast gəlinən kritik təhlükəsizlik boşluqlarını (xüsusilə **SQL Injection**) praktiki olaraq nümayiş etdirmək və bu boşluqların aradan qaldırılma yollarını öyrətmək məqsədilə hazırlanmış bir laboratoriya mühitidir.



Layihənin İcmalı

Tətbiq, istifadəçilərin şəxsi maliyyə göstəricilərini izləyə biləcəyi bir "Maliyyə Hesabatı" platformasıdır. Layihə iki əsas hissədən ibarətdir:
1.   Login:** İstifadəçinin autentifikasiyadan keçdiyi vizual interfeys.
2.  **Maliyyə Dashboard:** Gəlir və xərclərin dinamik qrafiklərlə (Chart.js) təqdim olunduğu idarəetmə paneli.

Texnoloji Stack

Bu layihənin qurulmasında aşağıdakı texnologiyalardan istifadə edilmişdir:
* **Backend:** Node.js & Express.js freymvorku.
* **Database:** SQLite3 (Relyasiya tipli verilənlər bazası).
* **Frontend:** HTML5, CSS3 (Modern Dark UI) və JavaScript (ES6+).
* **Vizualizasiya:** Chart.js (Maliyyə datalarının qrafikləşdirilməsi üçün).

Təhlükəsizlik Boşluğu: SQL Injection (SQLi)

Layihənin `server.js` faylındakı giriş mexanizmi qəsdən **müdafiəsiz (vulnerable)** şəkildə kodlaşdırılmışdır. İstifadəçidən gələn məlumatlar heç bir filtrasiyadan keçmədən birbaşa SQL sorğusuna daxil edilir:

```javascript
const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
```

### Hücum Ssenarisi (Bypass Authentication)
Hücumçu şifrəni bilmədən aşağıdakı **Payload** vasitəsilə sistemə sıza bilər:
* **Username:** `' OR 1=1 --`
* **Password:** `hacker_pass`

Bu manipulyasiya SQL sorğusunun məntiqini dəyişərək şifrə yoxlanışını ləğv edir və hakerə "Admin" yetkiləri ilə daxil olmaq imkanı verir.

 Quraşdırma və İşə Salma

Layihəni öz kompüterinizdə yoxlamaq üçün:

1.  Repozitoriyanı klonlayın:
    ```bash
    git clone https://github.com/istifadeci_adin/veb-tehlukesizlik.git
    ```
2.  Kitabxanaları yükləyin:
    ```bash
    npm install
    ```
3.  Serveri başladın:
    ```bash
    node server.js
    ```
4.  Brauzerdə açın: `http://localhost:3000`

Həll Yolu (Mitigation)

Bu boşluğu aradan qaldırmaq üçün layihədə **Parametrləşdirilmiş Sorğular (Parameterized Queries)** metodundan istifadə edilməsi tövsiyə olunur. Bu üsul, istifadəçi tərəfindən daxil edilən məlumatların kod kimi icra olunmasının qarşısını alır:

```javascript
// Təhlükəsiz Kod Nümunəsi
const query = "SELECT * FROM users WHERE username = ? AND password = ?";
db.get(query, [username, password], (err, row) => { ... });
```



 Nəticə

Bu layihə sübut edir ki, bir veb tətbiqinin vizual olaraq modern və peşəkar görünməsi onun daxili təhlükəsizliyinə zəmanət vermir. Kibertəhlükəsizlik prinsipləri proqram təminatının inkişafı (SDLC) mərhələsində təməl prioritet olmalıdır.

---
**Müəllif:** Ayxan Sərxanlı
**Tarix:** 2026
**Məqsəd:** Təhsil və Pentest Sınağı.
