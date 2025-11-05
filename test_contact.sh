#!/bin/bash
curl -X POST https://lhc-legal-consulting.onrender.com/api/account/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Nelson Valero","last_name":"Producción Test","email":"testprod@example.com","phone":"666111333","subject":"Test de producción","message":"Este es un mensaje de prueba desde entorno de producción."}'

