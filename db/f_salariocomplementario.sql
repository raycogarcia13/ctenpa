-- FUNCTION: public.f_salariocomplementario()

-- DROP FUNCTION public.f_salariocomplementario();

CREATE OR REPLACE FUNCTION public.f_salariocomplementario(
	)
    RETURNS SETOF salariodat 
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    ROWS 1000
    
AS $BODY$
DECLARE 
	sala salariodat;
	st NUMERIC(10,2);
	sd NUMERIC(10,2);
	sr NUMERIC(10,2);
	
begin
	for sala IN 
	SELECT  salario_basico,id,coeficiente FROM public.proyectista lOOP
	sd = (sala.sala/190.6)*180;
	sr = sd*sala.coefi;
	st = sd+sr;
	INSERT INTO public.salario(
	id, mes, salario, salario_descuento, salario_resultado, anno, "createdAt", "updatedAt", "ProyectistumId")
	VALUES (default, date_part('month',current_date), st, sd,sr,date_part('year',current_date), current_date, current_date, sala.idtext);
	return next sala;	
	end loop;
end;
$BODY$;

ALTER FUNCTION public.f_salariocomplementario()
    OWNER TO postgres;
