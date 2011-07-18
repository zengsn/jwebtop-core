CREATE TABLE webwares
(
  wid_ bigint NOT NULL,
  name_ character varying(64) NOT NULL,
  author_ character varying(64) NOT NULL,
  release_ character varying(32) NOT NULL,
  screen_ character varying(256),
  logo_ character varying(256),
  icon_ character varying(256),
  description_ text,
  status_ smallint NOT NULL DEFAULT 0,
  versions_ text NOT NULL,
  currentversion_ character varying(64) NOT NULL,
  jsclass_ character varying(256) NOT NULL,
  springcontext_ character varying(256),
  createdtime_ timestamp with time zone NOT NULL DEFAULT now(),
  styles_ text,
  jssources_ text,
  acl_ text,
  title_ character varying(64),
  CONSTRAINT pk_webware PRIMARY KEY (wid_)
);
CREATE SEQUENCE webwares_seq;
ALTER TABLE webwares ALTER COLUMN wid_ SET DEFAULT NEXTVAL('webwares_seq');
UPDATE webwares SET wid_ = NEXTVAL('webwares_seq');