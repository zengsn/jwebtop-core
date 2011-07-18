-- Table: webwares

-- DROP TABLE webwares;

CREATE TABLE webwares
(
  wid_ character varying(64) NOT NULL,
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
  CONSTRAINT pk_webwareid_ PRIMARY KEY (wid_)
)
WITH (
  OIDS=FALSE
);
-- ALTER TABLE webwares OWNER TO jwebtop;
