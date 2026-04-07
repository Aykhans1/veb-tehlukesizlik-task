
## Layihənin Quraşdırılması və İstismarı (Installation and Execution)

Tətbiqin lokal mühitdə işə salınması və təhlükəsizlik testlərinin həyata keçirilməsi üçün aşağıdakı prosedurlar ardıcıllıqla yerinə yetirilməlidir:

### 1. Sistem Tələbləri
* **Node.js:** Versiya 14.0 və ya daha yuxarı.
* **npm:** Node Paket Meneceri.
* **Git:** Versiya kontrol sistemi.

### 2. Repozitoriyanın Klonlanması
Layihəni GitHub-dan yerli diskə köçürmək üçün terminalda aşağıdakı əmri daxil edin:
```bash
git clone https://github.com/istifadeci_adin/veb-tehlukesizlik.git
cd veb-tehlukesizlik
```

### 3. Asılılıqların (Dependencies) Yüklənməsi
Lazımi kitabxanaların (Express, SQLite3 və s.) quraşdırılması üçün:
```bash
npm install
```

### 4. Serverin İşə Salınması
Tətbiqi lokal serverdə (localhost) aktivləşdirmək üçün:
```bash
node server.js
```
Server uğurla işə düşdükdən sonra brauzer vasitəsilə `http://localhost:3000` ünvanına keçid edin.

---

## Sızma Testinin (Penetration Test) İcrası

Tətbiqdə mövcud olan SQL Injection boşluğunu sınaqdan keçirmək üçün aşağıdakı metodologiyanı tətbiq edin:

1. **İlkin Vəziyyət:** Giriş səhifəsindəki (Login Page) forma xanalarını müəyyən edin.
2. **Manipulyasiya:** İstifadəçi adı (Username) xanasına aşağıdakı məntiqi ifadəni daxil edin:
   `' OR 1=1 --`
3. **İcra:** Şifrə xanasına hər hansı təsadüfi simvollar ardıcıllığı yazın və "Daxil ol" düyməsini sıxın.
4. **Müşahidə:** Autentifikasiya mexanizminin yan keçildiyini və sistemin "Dashboard" (İdarəetmə Paneli) interfeysinə birbaşa yönləndirmə etdiyini müşahidə edin.

---

## Təhlükəsizlik Xəbərdarlığı (Disclaimer)
Bu layihə yalnız təhsil və kibertəhlükəsizlik sahəsində maarifləndirmə məqsədilə hazırlanmışdır. Burada nümayiş etdirilən metodların icazəsiz sistemlərə qarşı tətbiqi hüquqi məsuliyyət yarada bilər. Layihənin əsas hədəfi proqramçıları təhlükəsiz kodlaşdırma standartlarına (Secure Coding Standards) riayət etməyə təşviq etməkdir.

---
**Status:** Aktiv Laboratoriya Mühiti
**Versiya:** 1.0.0
