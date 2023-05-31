# Developer Guide

![license](https://img.shields.io/badge/license-MIT-blue.svg)

> Based on Devias Kit - React Admin Dashboard[(Free version)](https://material-kit-react.devias.io/)

## Tech Stack 

* [Next.js](https://nextjs.org/)
* [NextAuth.js](https://next-auth.js.org/)
* [NextShield](https://imjulianeral.github.io/next-shield/)
* [next-api-decorators](https://github.com/instantcommerce/next-api-decorators)
* [Prisma](https://www.prisma.io/)
* [axios](https://github.com/axios/axios)

Others

* apexcharts
* emotion
* react-query
* react-toastify
* react-formik
* formik-mui
* formik-mui-x-date-pickers
* bcrypt
* date-fns
* lodash
* yup

## Getting started

> Recommend to use [NVM - Node Version Manager](https://github.com/nvm-sh/nvm) to manage node version.

- Recommended `node js 16.x` and `yarn 1+`. (suggestion v16.15.0)
- Install dependencies: `yarn`
- Start the project: `yarn start`

## License  

Distributed under the MIT License. See [LICENSE](https://github.com/melthaw/nextjs-mui-boilerplate/blob/main/LICENSE.md) for more information.

## Developer Guide

### Prisma

Format the prisma schema

> npx prisma format

Generate the prisma client

> npx prisma generate

Type Mapping

| Prisma	  | MongoDB|
|----------|---|
| String	  | string|
| Boolean	 | bool|
| Int	     | int|
| BigInt	  |long|
| Float	   |double|
| Decimal  |	Currently unsupported|
| DateTime |	timestamp|
| Date     |	date|
| Bytes    |	binData|
|Json | |


MongoDB types that are currently unsupported:

* Decimal128
* Undefined
* DBPointer
* Null
* Symbol
* MinKey
* MaxKey
* Object
* Javascript
* JavascriptWithScope
* Regex

Mongodb Object Mapping Example

```
model Example {
  id    String   @id @default(auto()) @map("_id") @db.ObjectId
}
```

