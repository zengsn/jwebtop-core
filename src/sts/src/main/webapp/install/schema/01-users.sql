CREATE TABLE users
(
  uid_ character varying(64) NOT NULL,
  username_ character varying(64),
  password_ character varying(64),
  email_ character varying(128),
  createdtime_ timestamp with time zone,
  updatedtime_ timestamp with time zone,
  enabled smallint DEFAULT 0,
  username character varying(10),
  "password" character varying(32),
  nickname_ character varying(64),
  enabled_ boolean NOT NULL DEFAULT true,
  CONSTRAINT pk_uid PRIMARY KEY (uid_)
);